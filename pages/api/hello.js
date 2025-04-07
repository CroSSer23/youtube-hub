// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    name: 'YouTube Hub API',
    version: '1.0.0',
    description: 'API для инструмента расчета длительности текста для YouTube видео',
    status: 'active'
  });
} 