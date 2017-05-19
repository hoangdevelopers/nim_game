export default {
    script1: function(data){
        var items = data.itemGroup
        var location = {
            heap: null,
            index: null
        }
        items.forEach(function(element) {
            if (  element.visible ){
                if( location.heap === null ) {
                    location.heap = element.location.heap
                    location.index = element.location.index
                }
                else if ( element.location.index > location.index ) { 
                    location.index = element.location.index
                    location.heap = element.location.heap
                    
                }
            }
        }, this)
        if(location.heap == null) return false
        return location
    }
}