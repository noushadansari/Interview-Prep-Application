const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     // origin: "http://localhost:5173",
//     origin: "https://interview-prep-application-kohl.vercel.app",
//     credentials: true
// }))


const allowedOrigins = [
  "http://localhost:5173",
  "https://interview-prep-application-kohl.vercel.app"
];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
