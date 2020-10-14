export const selector = (el, s) => el.querySelector(s)
export const getAttr = (el, attr) => el.getAttribute(attr)
export const setAttr = (el, attr, val) => el.setAttribute(attr, val)
export const hasClass = (el, className) => el.classList.contains(className)
export const addClass = (el, className) => el.classList.add(className)
export const removeClass = (el, className) => el.classList.remove(className)
export const toggleClass = (el, className) => el.classList.toggle(className)
export const getHtml = (el) => el.innerHTML
export const setHtml = (el, val) => el.innerHTML = val
export const randomize = () => Math.floor(Math.random() * 6) + 1
