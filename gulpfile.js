var gulp = require("gulp");
var jshint = require("gulp-jshint"); 
var jscs = require("gulp-jscs");

const paths = [
    "./*.js",
    "./controllers/*.js", 
    "./routes/*.js"];

gulp.task("inspector", ["jshint", "jscs"], () => {
    console.log("inspector..");
});

gulp.task("jshint", () => {
    return gulp
    .src(paths)
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish", {verbose: true}));
});

gulp.task("jscs", () => {
    return gulp
    .src(paths)
    .pipe(jscs());
});

gulp.task("watcher", () => {
    return gulp.watch(paths,["inspector"]);
});

gulp.task("default", ["inspector"], ()=> {
});

