/**
 * Common methods
 */

export default {
  /**
   * Download
   * @param  {Object} source         [description]
   * @param  {String} targetFilename [description]
   * @return {[type]}                [description]
   */
  download: (source, targetFilename) => {
    let blob = new Blob([source])
    let url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', targetFilename)
    document.body.appendChild(link)
    link.click()
  }
}
