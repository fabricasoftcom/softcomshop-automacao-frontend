/**
 * Validações de conteúdo XML de NFe relacionadas a FCP / FCPST (regressão incidente 85857).
 * @param {string} xml
 */
export function assertNfeXmlPossuiTagsFcpComNumeros(xml) {
  expect(xml, 'corpo XML deve ser string não vazia').to.be.a('string').and.to.have.length.greaterThan(50);
  expect(xml, 'deve parecer XML de NFe').to.match(/<nfeProc|<NFe[\s>]/i);

  const tags = [
    'vFCPST',
    'pFCPST',
    'vFCP',
    'pFCP',
    'vFCPUFDest',
    'pFCPUFDest',
    'vFCPSTRet',
    'pFCPSTRet',
  ];

  const temAlgum = tags.some((tag) => {
    const re = new RegExp(`<${tag}>\\s*[0-9]+[\\d.,]*\\s*</${tag}>`, 'i');
    return re.test(xml);
  });

  expect(
    temAlgum,
    `esperado pelo menos uma tag FCP com valor numérico entre: ${tags.join(', ')}`,
  ).to.eq(true);
}
