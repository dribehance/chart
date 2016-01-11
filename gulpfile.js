var gulp = require("gulp"),
    connect = require("gulp-connect");
gulp.task("connect", function() {
    connect.server({
        host: "localhost",
        port: "8000",
        root: "",
        livereload: true
    })
});
gulp.task("livereload",function(){
	gulp.src("./*.html").pipe(connect.reload())
});
gulp.task("watch",function(){
	gulp.watch("js/**/*",["livereload"])
	gulp.watch("css/**/*",["livereload"])
	gulp.watch("images/**/*",["livereload"])
	gulp.watch("*.html",["livereload"])
})
gulp.task("default",["watch","connect"])