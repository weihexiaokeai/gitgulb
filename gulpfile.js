var gulp=require("gulp")
var webserver=require("gulp-webserver")
var sass=require("gulp-sass")
var concat=require("gulp-concat")
var uglify=require("gulp-uglify")
var babel=require("gulp-babel")
var cleancss=require("gulp-clean-css")
gulp.task("server",function(){
    return gulp.src(".")
     .pipe(webserver({
         open:true,
         livereload:true,
         host:"localhost",
         port:7000,
         fallback:"./src/index.html"
     }))     
})
gulp.task("js",function(){
    return gulp.src("./src/scripts/*.js")
            .pipe(concat("mani.js"))
            .pipe(babel({
                presets:"es2015"
            }))
            .pipe(uglify())
            .pipe(gulp.dest("dist/js"))
})
gulp.task("sass",function(){
    return gulp.src("./src/scss/*.scss")
     .pipe(sass())
     .pipe(gulp.dest("dist/sass"))
})
gulp.task("cleancss",function(){
    return gulp.src("./src/css/*.css")
     .pipe(cleancss())
     .pipe(gulp.dest("dist/css"))
})
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series("sass"))
})

  gulp.task("dev",gulp.series("sass","server","watch"))