import { NextRequest, NextResponse } from 'next/server'
import db from '@/data/db.json'

interface Pokemon {
  id: number;
  [key: string]: string | number | object;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const { path } = params
  const fullPath = path.join('/')
  const { searchParams } = request.nextUrl

  // Parse the path: e.g., "en_pokemons" or "en_pokemons/1"
  const pathParts = fullPath.split('/')
  const endpoint = pathParts[0] // e.g., "en_pokemons", "ja_types", "zh_egg_groups"
  const id = pathParts[1] // Optional ID for specific pokemon

  // Extract locale and resource type from endpoint
  // e.g., "en_pokemons" -> locale: "en", resource: "pokemons"
  const match = endpoint.match(/^(en|ja|zh)_(pokemons|types|egg_groups)$/)

  if (!match) {
    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 404 },
    )
  }

  const [, locale, resource] = match
  const dataKey = `${locale}_${resource}` as keyof typeof db

  // Get the data
  const data = db[dataKey]

  if (!data) {
    return NextResponse.json(
      { error: 'Data not found' },
      { status: 404 },
    )
  }

  // If ID is provided (e.g., /en_pokemons/1)
  if (id && resource === 'pokemons') {
    const pokemonId = parseInt(id, 10)
    const pokemon = data.find((p: Pokemon) => p.id === pokemonId)

    if (!pokemon) {
      return NextResponse.json(
        { error: 'Pokemon not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(pokemon)
  }

  // For list endpoints (types, egg_groups, or pokemons without ID)
  if (resource === 'pokemons') {
    // Handle pagination and sorting for pokemons
    const page = parseInt(searchParams.get('_page') || '1', 10)
    const limit = parseInt(searchParams.get('_limit') || '20', 10)
    const sort = searchParams.get('_sort') || 'id'
    const order = searchParams.get('_order') || 'asc'

    // Sort data
    const sortedData = [...data].sort((a: Pokemon, b: Pokemon) => {
      const aVal = a[sort]
      const bVal = b[sort]

      if (order === 'asc') {
        return aVal > bVal ? 1 : -1
      }
      return aVal < bVal ? 1 : -1
    })

    // Paginate
    const start = (page - 1) * limit
    const end = start + limit
    const paginatedData = sortedData.slice(start, end)

    // Return with total count header (like json-server)
    return NextResponse.json(paginatedData, {
      headers: {
        'X-Total-Count': sortedData.length.toString(),
      },
    })
  }

  // For types and egg_groups, return all data
  return NextResponse.json(data)
}
