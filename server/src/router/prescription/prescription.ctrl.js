import mongoose from "mongoose" // mongoDB 사용


/*        model        */
const PrescriptionCollection = mongoose.model("Prescription", {
  patientName: {
    type: String
  },
  medicine: {
    type: String
  },
  created: {
    type: Date,
    default: new Date()
  },
}) 

/*        controller        */
// 전체 data 가져오기
export const get = async (ctx, next) => {
  const data = await PrescriptionCollection.find()
  ctx.status = 200
  ctx.body = data

  await next()
}

// params로 받은 id로 일치하는 data 하나만 가져오기
export const getOne = async (ctx, next) => {
  const { id } = ctx.params

  const data = await PrescriptionCollection.findOne({ _id: id })

  ctx.status = 200
  ctx.body = data

  await next()
}

// 검색 (병원 이름 중 검색어가 포함된 이름만 뽑기)
export const filter=async(ctx)=>{       // 병원 검색 시 사용하는 get
  const filter=ctx.params             // 입력 받은 단어(params)
  let total, hospitals
  try{
      total=await PrescriptionCollection.find().exec()  // 모든 데이터 조회 후
      hospitals=total.filter(item=>item.name.includes(Object.values(filter))) //모든 병원 이름 중 입력받은 단어를 포함하는 것만 필터링
  }catch(e){
      return ctx.throw(200,e)
  }
  ctx.body=hospitals
}

// patientName, medicine (글 작성) 게시하기
export const post = async (ctx, next) => {
  const {
    patientName,
    medicine
  } = ctx.request.body
  const newPrescription = new PrescriptionCollection({
    patientName,
    medicine
  })
  await newPrescription.save()
  await next()
}

// 수정하기
export const put = async (ctx, next) => {
  const { id } = ctx.params

  const {
    patientName,
    medicine
  } = ctx.request.body

  // 1. 데이터 읽고
  const data = await PrescriptionCollection.findOne({ _id: id })

  // 2. 데이터 업데이트하고
  data.patientName = patientName || data.patientName
  data.medicine = medicine || data.medicine

  // 3. 데이터를 저장한다.
  await data.save()
  await next()
}

// 병원 정보 업데이트 (전체 정보 변경 가능)
export const update=async(ctx)=>{
  const id=ctx.params
  let hospital
  try{
      hospital=await PrescriptionCollection.updateOne(id,ctx.request.body,{
          upsert: true,
          new:true
      }).exec()
  } catch(e){
      return ctx.throw(500,e)
  }
  ctx.body=hospital
}

// 병원에서 예약된 시간 추가(특정한 정보만 변경 가능)
export const updateTime = async (ctx) => {
  const { _id, reservationTime } = ctx.params
  let hospital
  try {
    console.log('_id: ', _id)
    console.log('reservationTime : ', reservationTime)
    hospital = await PrescriptionCollection.findOneAndUpdate(
      { _id: _id },
      {
        $addToSet: {  // id로 검색해서 특정 data의 특정 column만 수정
          reservationTime: reservationTime,
        }             // 이 경우엔 rservationTime이라는 배열에 데이터를 추가함
      }
    ).exec()
  } catch (e) {
    ctx.throw(500, e)
  }
  ctx.body = hospital
}

// 병원에서 예약된 시간 삭제(특정 정보만 변경 가능)
export const removeTime = async (ctx) => {
  const { _id, reservationTime } = ctx.params
  let hospital
  try {
      hospital = await Hospital.findOneAndUpdate(
      { _id: _id },
      {
        $pull: {  // id 검색해서 입력받은 params를 reservationTime에서 찾아서 삭제
          reservationTime: reservationTime
        }
      }
    )
  } catch (e) {
    ctx.throw(500, e)
  }
  ctx.body = hospital
}

// 한 id 검색으로 특정 data 삭제하기
export const remove = async (ctx, next) => {
  const { id } = ctx.params
  console.log(id)
  await PrescriptionCollection.deleteOne({ _id: id })
  await next()
}

// 모든 data 삭제하기
export const removeMany = async (ctx, next) => {
  const { patientName } = ctx.params

  await PrescriptionCollection.deleteMany({ patientName })

  await next()
}
