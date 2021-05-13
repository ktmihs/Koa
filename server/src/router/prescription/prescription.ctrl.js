import mongoose from "mongoose";

const PrescriptionCollection = mongoose.model("Prescription", {
  patientName: {
    type: String,
  },
  medicine: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

export const get = async (ctx, next) => {
  const data = await PrescriptionCollection.find();
  ctx.status = 200;
  ctx.body = data;

  await next();
};

export const getOne = async (ctx, next) => {
  const { id } = ctx.params;

  const data = await PrescriptionCollection.findOne({ _id: id });

  ctx.status = 200;
  ctx.body = data;

  await next();
};

export const post = async (ctx, next) => {
  const {
    patientName,
    medicine,
  } = ctx.request.body;

  const newPrescription = new PrescriptionCollection({
    patientName,
    medicine,
  });

  await newPrescription.save();

  await next();
};

export const put = async (ctx, next) => {
  const { id } = ctx.params;

  const {
    patientName,
    medicine,
  } = ctx.request.body;

  // 1. 데이터 읽고
  const data = await PrescriptionCollection.findOne({ _id: id });

  // 2. 데이터 업데이트하고
  data.patientName = patientName || data.patientName;
  data.medicine = medicine || data.medicine;

  // 3. 데이터를 저장한다.
  await data.save();

  await next();
};

export const remove = async (ctx, next) => {
  const { id } = ctx.params;

  console.log(id);

  await PrescriptionCollection.deleteOne({ _id: id });

  await next();
};

export const removeMany = async (ctx, next) => {
  const { patientName } = ctx.params;

  await PrescriptionCollection.deleteMany({ patientName });

  await next();
};
