const { dest, parallel, watch, src, } = require("gulp");
const concat = require("gulp-concat");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass")(require("sass"));
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const paths = {
  styles: {
    from: ["./static/scss/**/*.scss", "!./static/scss/**/_*.scss"],
    srcWatch: "./static/scss/**/*.scss",
    to: "./static/css",
  },
};

const styleTask = () => {
  return src(paths.styles.from)
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded", }))
    .pipe(autoprefixer({
      cascade: true,
      overrideBrowserslist: ["last 5 versions"],
    }))
    .pipe(cleanCss({ level: { 1: { specialComments: 0, }, }, }))
    .pipe(concat("main.css"))
    .pipe(dest(paths.styles.to));
};

const watching = () => {
  watch(paths.styles.srcWatch, parallel(styleTask));
};

const buildTask = () => parallel(styleTask);
const defaultTask = () => parallel(buildTask(), watching);

exports.build = buildTask();
exports.default = defaultTask();