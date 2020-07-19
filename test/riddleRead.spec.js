const expect = require('chai').expect

const Riddle = require('../src/riddle')

describe('Riddle read', () => {

  const riddles = [{
    title: 'titleTestRiddle',
    question: 'A yada yada riddle?',
    answer: 'A yada yada answer',
    tags: ['tag1', 'tag2']
  },{
    title: 'titleTestRiddle2',
    question: 'A yada yada riddle?',
    answer: 'A yada yada answer',
    tags: ['tag1']
  }]

  describe('find all the riddles with a title', () => {

    beforeEach(done => {
      Riddle.create(riddles)
      .then(createdRiddles => {
        done()
      })
      .catch(err => {
        throw new Error(err)
      })
    })

    it('should find all the riddles with a tag', done => {
      Riddle.find({ tags: 'tag1' })
      .then(retrievedRiddles => {
        expect(retrievedRiddles.length).to.equal(2)
        done()
      })
      .catch(err => {
        throw new Error(err)
      })
    })
  })

  describe('read a riddle with a title', () => {

    beforeEach(done => {
      Riddle.create(riddles[0])
      .then(createdRiddle => {
        done()
      })
      .catch(err => {
        throw new Error(err)
      })
    })

    it('should read a riddle with an title', done => {
      Riddle.findOne({ title: riddles[0].title })
      .then(retrievedRiddle => {
        expect(retrievedRiddle._id).to.exist
        expect(retrievedRiddle.title).to.equal(riddles[0].title)
        expect(retrievedRiddle.question).to.equal(riddles[0].question)
        expect(retrievedRiddle.answer).to.equal(riddles[0].answer)
        done()
      })
      .catch(err => {
        throw new Error(err)
      })
    })
  })

}) 