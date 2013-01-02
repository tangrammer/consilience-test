var ajax={
    simple:function(_url,caller){
        $.ajax({url: _url, cache: false}).done(caller);
    },
    form:function (spec){
        var options = { 
            type: spec.type, 
            url: spec.url,
            beforeSubmit: function(arr, $form, options) {  
                $(spec.form).fadeOut("slow") ;
                // return false
                // to cancel submit       
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(errorThrown+"- "+textStatus);
            },
            success: function(html) { 
                if(spec.on_end!==undefined){
                    //    alert("calling SUCCESS "+spec.on_end);
                    if(html.error!==undefined){
                        if(spec.on_error!==undefined){
                            spec.on_error.call(this);                            
                        } else{
                            alert("oh! this error have been not catched  :( \n"+html.error);
                        }
                    }else{
                        spec.on_end.call(this);
                    }
                }
            }
        };
        $(spec.form).ajaxForm(options) ;
    },

    form_restful_behavior:{
        
        remove:function( _on_end, _on_error){
            ajax.form_restful_behavior._base(this.form_id, "delete",this.url+this.id, _on_end, _on_error);
        },
        add:function(_on_end, _on_error){
            ajax.form_restful_behavior._base(this.form_id, "post", this.url, _on_end, _on_error);
        },
        edit:function( _on_end, _on_error){
            ajax.form_restful_behavior. _base(this.form_id, "put", this.url+this.id, _on_end, _on_error);
        },
        _base:function(_form, _type, _url, _on_end, _on_error){
            ajax.form({form:_form, type:_type, url:_url, on_end: _on_end, on_error:_on_error});
        }
    }
};

