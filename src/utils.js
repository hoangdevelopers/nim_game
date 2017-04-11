export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}
export const initText = (objects) => {
  objects.forEach(function (text) {
    text.context.font = text.font
    text.context.fontSize = text.fontSize
    text.context.fill = text.fill
    text.context.smoothed = text.smoothed 
    text.context.anchor.setTo(0.5)
  })
}
export const initTextFloatLeft = (objects) => {
    objects.forEach(function (text) {
    text.context.font = text.font
    text.context.fontSize = text.fontSize
    text.context.fill = text.fill
    text.context.smoothed = text.smoothed 
    text.context.anchor.setTo(0)
  })
}

