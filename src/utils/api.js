const API_URL = ''; // use CRA proxy

export async function fetchAthletes(params = {}){
  const p = new URLSearchParams();
  const { page=1, limit=10, sort='overall', order='desc', q='', sport='', flagged='', minOverall='' } = params;
  p.set('_page', page); p.set('_limit', limit);
  p.set('_sort', sort); p.set('_order', order);
  if (q) p.set('q', q);
  if (sport) p.set('sport', sport);
  if (flagged !== '') p.set('flagged', flagged);
  if (minOverall) p.set('overall_gte', minOverall);

  const res = await fetch(`/athletes?${p.toString()}`);
  const total = Number(res.headers.get('X-Total-Count') || 0);
  const data = await res.json();
  return { data, total };
}

export async function fetchAthlete(id){
  const a = await fetch(`/athletes/${id}`).then(r=>r.json());
  const m = await fetch(`/metrics?athleteId=${id}&_sort=date&_order=asc`).then(r=>r.json());
  const e = await fetch(`/evaluations?athleteId=${id}&_sort=date&_order=desc`).then(r=>r.json());
  return { athlete: a, metrics: m, evaluations: e };
}
