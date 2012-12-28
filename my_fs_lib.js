var fs=require('fs');
exports.apply_fn_to_files=function apply_fn_to_files(files, ff){
    for(var f=0; f<files.length; f++){
        this.file=files[f];
     
            ff.apply(this);
      
    }   
};
exports.read_file=function(dir_plus_file_name, on_end_read){
    fs.readFile(dir_plus_file_name, on_end_read);
};
// on_end_read(err, files) // files is an array containing the names
// of the file in directory
exports.read_dir=function(dir_plus_file_name, on_end_read){
    fs.readdir(dir_plus_file_name, on_end_read);
};
