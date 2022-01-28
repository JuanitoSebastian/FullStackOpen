const info = (...params) => {
  console.log('[💭]', ...params)
}

const error = (...params) => {
  console.error('[🔥]', ...params)
}

const stuffToExport = {
  info,
  error
}

export default stuffToExport