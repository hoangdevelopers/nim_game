export default {
    nim1: function(data, {heap, index}){
        var items = data.itemGroup
        var max = -1
        items.forEach(function(element) {
            if ( element.location.heap === heap && element.visible ){
                if ( element.location.index > max ) max = element.location.index
            }
        }, this)
        return max-index < 2
    }
}