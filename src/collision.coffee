collision = (o) ->
  p = player.texture
  px = p.position.x
  py = p.position.y
  pw = p.width
  ph = p.height

  ox = o.position.x
  oy = o.position.y
  ow = o.width
  oh = o.height

  out =
    x: null
    y: null

  # возвращается направление движения, типа, двинул стрелкой влево
  if (px < ox + ow && px + pw > ox + ow) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))
    out.x = 'right'
  else if (px < ox && px + pw > ox) && ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))
    out.x = 'left'

  if (py < oy && oy < py + ph) && ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox))
    out.y = 'top'
  else if (py + ph > oy + oh && py < oy + oh) && ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox))
    out.y = 'bottom'

  return out

# export
module.exports = collision

# определение коллизии с телом
# if ((px < ox + ow && px + pw > ox + ow) || (px < ox && px + pw > ox)) &&
#    ((py < oy && oy < py + ph) || (py + ph > oy + oh && py < oy + oh))
#   console.log 'collision'