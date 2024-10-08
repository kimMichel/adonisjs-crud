import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'

export default class BooksController {
  async index({ response }: HttpContext) {
    const books = await Book.query().where('active', '1')

    return response.json(books)
  }

  async show({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).json({ message: 'Book not found' })
    }
    return response.json(book)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'authorName', 'pages'])
    const book = await Book.create(data)

    return response.json(book)
  }

  async update({ params, request, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).json({ message: 'Book not found' })
    }
    book.merge(request.only(['name', 'description', 'authorName', 'pages']))

    await book.save()

    return response.json(book)
  }

  async destroy({ params, response }: HttpContext) {
    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).json({ message: 'Book not found' })
    }
    book.active = '0'
    await book.save()

    return response.json({ message: 'Book deleted successfully' })
  }
}
