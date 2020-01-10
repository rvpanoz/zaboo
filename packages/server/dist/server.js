"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _handlers = require("./handlers");

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  port
} = _config.default || 8000;
const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)());
app.post("/authenticate", _handlers.signIn);
app.get("/home", _handlers.welcome);
app.post("/refresh", _handlers.refresh);
app.listen(port, () => console.log(`Server is running at port: ${port}`));