const expect = require('chai').expect

const Riddle = require('../src/riddle')

describe('Riddle Create', () => {

  const riddle = {
    title: 'A title for the riddle create test',
    question: 'What are ten things you can always count on?',
    answer: 'Your fingers'
  }

  it('should create a riddle', done => {
    Riddle.create(riddle)
    .then(result => {
      expect(result._id).to.exist
      expect(result.__v).to.exist
      expect(result.title).to.equal(riddle.title)
      expect(result.question).to.equal(riddle.question)
      expect(result.answer).to.equal(riddle.answer)
      done()
    })
    .catch(err => {
      throw new Error(err)
    })
  })

  it('should save a riddle', done => {
    const riddle = new Riddle({
      title: 'A title for the riddle save test',
      question: 'What are ten things you can always count on?',
      answer: 'Your fingers'
    })
    riddle.save()
    .then(result => {
      expect(result.isNew).to.equal(false)
      expect(result._id).to.exist
      expect(result.__v).to.exist
      expect(result.title).to.equal(riddle.title)
      expect(result.question).to.equal(riddle.question)
      expect(result.answer).to.equal(riddle.answer)
      done()
    })
    .catch(err => {
      throw new Error(err)
    })
  })
})