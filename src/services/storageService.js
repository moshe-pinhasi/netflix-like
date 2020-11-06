const prefix = 'appflix'

const save = (name, data) => {
  localStorage.setItem(`${prefix}-${name}`, JSON.stringify(data))
}

const remove = (name) => {
  localStorage.removeItem(`${prefix}-${name}`)
}

const load = (name) => {
  const data = localStorage.getItem(`${prefix}-${name}`)
  if (!data) return null
  return JSON.parse(data)
}

export default {
  save,
  load,
  remove
}