export default async ({ $content }, inject) => {
  const files = await $content('', { deep: true }).fetch()
  const filesArray = Array.isArray(files) ? files : [files]
  const treeData = createTree(filesArray.map((file) => file.dir))

  // Inject the treeData to be available globally in the app
  inject('treeData', treeData)
  inject('filesArray', filesArray)
}

function createTree(arr) {
  const tree = []

  arr.forEach((path) => {
    const pathParts = path.split('/').filter((part) => part !== '') // Split path into parts

    let currentNode = tree
    let currentPath = ''

    pathParts.forEach((part, index) => {
      currentPath += `/${part}`

      // Check if current path exists in the tree
      const existingNode = currentNode.find((node) => node.key === currentPath)

      if (!existingNode) {
        const newNode = {
          title: part,
          key: currentPath,
        }

        currentNode.push(newNode)
        currentNode = newNode.children || (newNode.children = [])
      } else {
        currentNode = existingNode.children
      }
    })
  })

  return tree
}
