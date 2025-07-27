// api/filmes.js
import axios from 'axios';

export default async function handler(req, res) {
  const { dns, user, pass } = req.query;

  if (!dns || !user || !pass) {
    return res.status(400).json({ error: 'Parâmetros ausentes' });
  }

  try {
    const baseURL = `http://${dns}/player_api.php?username=${user}&password=${pass}`;

    const { data: categorias } = await axios.get(`${baseURL}&action=get_vod_categories`);
    const resultado = [];

    for (const categoria of categorias) {
      const { category_id, category_name } = categoria;

      const { data: conteudo } = await axios.get(
        `${baseURL}&action=get_vod_streams&category_id=${category_id}`
      );

      resultado.push({
        id: category_id,
        nome: category_name,
        conteudo,
      });
    }

    return res.status(200).json(resultado);
  } catch (error) {
    console.error('Erro na função:', error.message);
    return res.status(500).json({ error: 'Erro ao buscar dados do servidor IPTV' });
  }
}
