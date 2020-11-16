/**
 * 获取当前浏览器滚动条宽度
 */
export const getScrollbarWidth = () => {
  // 创建不可见的虚拟容器
  const container = document.createElement('div');
  container.style.visibility = 'hidden';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '100px';
  container.style.overflow = 'scroll'; // 强制展示滚动条

  document.body.append(container);

  // 获取外容器宽度
  const containerWidth = container.offsetWidth;

  // 创建内部容器
  const inner = document.createElement('div');
  inner.style.width = '100%';
  container.appendChild(inner);

  // 获取内部容器宽度
  const innerWidth = inner.offsetWidth;

  // 移除节点
  container.parentNode?.removeChild(container);

  // 获取实际滚动条宽度
  return containerWidth - innerWidth;
};

/**
 * 判断是否出现文本省略号
 * @param dom DOM元素
 */
export function isEllipsis(dom: HTMLElement | null) {
  if (!dom) return false;
  return dom.scrollWidth > dom.clientWidth;
}
