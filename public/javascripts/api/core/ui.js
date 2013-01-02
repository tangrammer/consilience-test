var ui={
    check_dom_element:function(the_element){
        var o=$(the_element);
        if (!o.length){ 
            alert("ERROR FATAL: dom element undefined: "+the_element);
            throw new Error("Something bad happened.");
        }
        return o;
    },
    
    /**
       f_function_in_dom_with_view apply in the_dom_element the result of the_function, with callback
       on_end_function_displayed 
       the_view is the template 
    **/
    function_in_dom_with_view: function(spec){  
        var the_function=spec.fn;
        var the_view=spec.view;
        var the_dom_element=spec.dom;
        var on_end=spec.on_end;


        var dom_element=this.check_dom_element(the_dom_element);
        //    console.log(the_dom_element+"\n---"+cache[the_dom_element]);

        var the_render_function=function(){
            ui.smoth_paint(dom_element, Jaml.render(the_view, this.result), on_end);
        };

        // if(the_function.arguments)
        var args=[];

        args.push(the_render_function);

        the_function.apply(this, args);
        
        // add to cache the function
        this.cache_funtions.add(the_dom_element, function(){the_function.apply(this, args);});

    },
    cache_funtions:{
        cache:{},
        add: function (the_dom_element, _fn){
            if(this.cache[the_dom_element]===undefined){
                //        console.log("setting prop");
            }else{
                //     console.log("prop exists");
            }
            this.cache[the_dom_element]=_fn;
        }
    },
    smoth_paint:function(e, r, on_end){
        e
            .html("<br>Loading")
            .fadeOut("slow", function(){
                $(this).html(r+"<br>")
                    .fadeIn("slow", function(){
                        if(on_end){
                            on_end.call(this);
                        }
                    }
                           );});
    }
    
};
