module.exports.pages = function pages (glyphs) {
  var pages = new Float32Array(glyphs.length * 4 * 1)
  var i = 0
  glyphs.forEach(function (glyph) {
    var id = glyph.data.page || 0
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
    pages[i++] = id
  })
  return pages
}

module.exports.uvs = function uvs (glyphs, texWidth, texHeight, flipY) {
  var uvs = new Float32Array(glyphs.length * 4 * 2)
  var i = 0
  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data
    var bw = (bitmap.x + bitmap.width)
    var bh = (bitmap.y + bitmap.height)

    // top left position
    var u0 = bitmap.x / texWidth
    var v1 = bitmap.y / texHeight
    var u1 = bw / texWidth
    var v0 = bh / texHeight

    if (flipY) {
      v1 = (texHeight - bitmap.y) / texHeight
      v0 = (texHeight - bh) / texHeight
    }

    // BL
    uvs[i++] = u0
    uvs[i++] = v1
    // TL
    uvs[i++] = u0
    uvs[i++] = v0
    // TR
    uvs[i++] = u1
    uvs[i++] = v0
    // BR
    uvs[i++] = u1
    uvs[i++] = v1
  })
  return uvs
}

module.exports.positions = function positions(glyphs, resolution = 2) { 
  var positions = new Float32Array(glyphs.length * resolution * resolution * 4 * 2)  // Aumentar la cantidad de vértices
  var i = 0

  glyphs.forEach(function (glyph) {
    var bitmap = glyph.data

    // Coordenadas de la esquina inferior izquierda
    var x = glyph.position[0] + bitmap.xoffset
    var y = glyph.position[1] + bitmap.yoffset

    // Tamaño del cuadro (glifo)
    var w = bitmap.width
    var h = bitmap.height

    // Subdivisión de cada glifo en una cuadrícula de `resolution` x `resolution`
    var stepX = w / resolution;
    var stepY = h / resolution;

    for (var row = 0; row < resolution; row++) {
      for (var col = 0; col < resolution; col++) {
        // Vértice inferior izquierdo
        positions[i++] = x + col * stepX;
        positions[i++] = y + row * stepY;

        // Vértice superior izquierdo
        positions[i++] = x + col * stepX;
        positions[i++] = y + (row + 1) * stepY;

        // Vértice superior derecho
        positions[i++] = x + (col + 1) * stepX;
        positions[i++] = y + (row + 1) * stepY;

        // Vértice inferior derecho
        positions[i++] = x + (col + 1) * stepX;
        positions[i++] = y + row * stepY;
      }
    }
  })

  return positions
}
