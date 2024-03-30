class Binary_rain {
  constructor(options) {
    this.element = document.querySelector(options.el)

    this.color = options.color
    this.size = options.size
    this.timer = options.timer

    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('binary-rain')
    this.canvas.width = options.width
    this.canvas.height = options.height
    this.ctx = this.canvas.getContext("2d");


    this.element.appendChild(this.canvas)

    this.lines = []

    this.drawActive = false

    this.generate()
  }

  draw() {
    if (this.canvas.getContext) {
      this.drawActive = true
      const ctx = this.ctx
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      ctx.fillStyle = this.color

      for (let i = 0; i < this.lines.length; i++) {
        for (let j = 0; j < this.lines[i].length; j++) {
          ctx.font = `${this.lines[i][j].size}px Roboto Mono`

          ctx.fillText(this.lines[i][j].value, this.lines[i][j].x * this.size, this.lines[i][j].y * (this.lines[i][j].size + 5));
          this.lines[i][j].y++

          if (Math.round(this.canvas.height / this.lines[i][j].size) == this.lines[i][j].y) {
            this.lines[i].splice(j, 1)
          }
        }

        if (!this.lines[i].length) {
          this.lines.splice(i, 1)
        }

      }
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.draw()
        }, this.timer);
      })
    }
  }

  generate() {
    const binaryCode = [0, 1]
    const probability = [true, false, true, true, true, true, true, true, true, true]

    const line = []
    const x = Math.floor(Math.random() * (this.canvas.width / this.size))
    const size = Math.round(this.size * Math.random())

    for (let j = 0; j < 8; j++) {
      line[j] = {
        value: binaryCode[Math.floor(binaryCode.length * Math.random())],
        x: x,
        y: 1 - j,
        size: size,
      }
    }

    if (probability[Math.floor(probability.length * Math.random())]) {
      this.lines.push(line)
      if (!this.drawActive) {
        requestAnimationFrame(() => {
          this.draw()
        })
      }
    }

    setTimeout(() => requestAnimationFrame(() => {
      this.generate()
    }), this.timer * 10)

  }
}

const rain = new Binary_rain({
  el: '.app',
  width: window.innerWidth,
  height: window.innerHeight + 10,
  color: 'green',
  size: 20,
  timer: 10
})