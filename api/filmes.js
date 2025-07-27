export default async function handler(req, res) {
  const { dns, user, pass } = req.query;

  if (!dns  !user  !pass) {
    return res.status(400).json({ error 'dns, user e pass são obrigatórios' });
  }

  const BASE_URL = https${dns}player_api.php;

  try {
    const catRes = await axios.get(${BASE_URL}username=${user}&password=${pass}&action=get_vod_categories);
    const categorias = catRes.data;

    const resultado = [];

    for (const cat of categorias) {
      try {
        const streamsRes = await axios.get(
          ${BASE_URL}username=${user}&password=${pass}&action=get_vod_streams&category_id=${cat.category_id}
        );

        resultado.push({
          id cat.category_id,
          nome cat.category_name,
          conteudo streamsRes.data
        });
      } catch {
        resultado.push({
          id cat.category_id,
          nome cat.category_name,
          conteudo []
        });
      }
    }

    res.status(200).json(resultado);
  } catch (e) {
    res.status(500).json({ error 'Erro ao buscar dados', detalhes e.message });
  }
}