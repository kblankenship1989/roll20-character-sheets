const gulp = require("gulp");
const pug = require("gulp-pug-3");
const sass = require('gulp-sass');

gulp.task("scss", () => {
  return gulp.src("./scss/DnD_5e_Helper.scss")
      .pipe(sass({
        outputStyle: "expanded"
      }).on("error", sass.logError))
    .pipe(gulp.dest("./"))
})

gulp.task("html", function () {
  return gulp.src("./src/pug/DnD_5e_Helper.pug")
    .pipe(pug({
      pretty: true,
      locals: require('./src/json/constants.json')
    }))
    .pipe(gulp.dest("./"))
})

gulp.task("watch", gulp.series(["scss", "html"], () => {
  gulp.watch("./scss/**/*.scss", gulp.series(["scss"]))
  gulp.watch(["./pug/**/*.pug","./js/**/*.js"], gulp.series(["html"]))
}))

gulp.task("build", gulp.series(["scss", "html"]))
