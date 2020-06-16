var items =document.querySelectorAll('.timeline li');

        function isVisible(e){
            if(e.getBoundingClientRect().bottom<window.innerHeight)
            {
                return true;
            }
        }
           function callBack(){
         for(var i=0;i<items.length;i++)
         {
             if(isVisible(items[i]))
                items[i].classList.add('in-view');
         }
     }
window.addEventListener("scroll", callBack);