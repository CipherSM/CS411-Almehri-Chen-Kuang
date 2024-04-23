// (the schema for the user)
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  URL1: {
    type: String,
    required: true,
  },
  Title1: {
    type: String,
    required: true,
  },
  Summary1: {
    type: String,
    required: true,
  },
  URL2: {
    type: String,
  },
  Title2: {
    type: String,
  },
  Summary2: {
    type: String,
    required: true,
  },
  URL3: {
    type: String,
    required: true,
  },
  Title3: {
    type: String,
    required: true,
  },
  Summary3: {
    type: String,
  },
});

const BusinessSchema = new mongoose.Schema({
  URL1: {
    type: String,
    required: true,
  },
  Title1: {
    type: String,
    required: true,
  },
  Summary1: {
    type: String,
    required: true,
  },
  URL2: {
    type: String,
  },
  Title2: {
    type: String,
  },
  Summary2: {
    type: String,
    required: true,
  },
  URL3: {
    type: String,
    required: true,
  },
  Title3: {
    type: String,
    required: true,
  },
  Summary3: {
    type: String,
  },
});


const TechDB = mongoose.model("TechArticles", TopicSchema);
const BussinessDB = mongoose.model("BusinessArticles", TopicSchema);
const EnvironmentDB = mongoose.model("EnvironmentArticles", TopicSchema);
const EntertainmentDB = mongoose.model("EntertainmentArticles", TopicSchema);
const SportsDB = mongoose.model("SportsArticles", TopicSchema);
export default User;