const gulp = require("gulp4");

class TaskRunner {

    run(task: Function): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            gulp.parallel(task)(error => {
                if (error) return reject(error);
                resolve();
            });
        }).catch(error => this.exit(1));
    }

    protected exit(code: number) {
        // Fix stdout truncation on windows
        if (process.platform === 'win32' && (<any>process.stdout).bufferSize) {
            process.stdout.once('drain', function () {
                process.exit(code);
            });
            return;
        }
        process.exit(code);
    }
}

export default TaskRunner