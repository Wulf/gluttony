const gulp = require('gulp')
const uglify = require('gulp-uglify')

gulp.task('default', function() {
  gulp.src('src/gluttony.js')
  .pipe(uglify())
  .pipe(gulp.dest('./'))
})
