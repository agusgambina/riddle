const chai = require('chai')
const { expect } = require('chai')

const Riddle = require('../src/riddle')

describe('Riddle delete', () => {

  const riddleData = {
    title: 'titleTestRiddle',
    question: 'A yada yada riddle?',
    answer: 'A yada yada answer',
    tags: ['tag1', 'tag2']
  }

  let riddle

  beforeEach(done => {
    riddle = new Riddle(riddleData)
    riddle.save()
    .then(() => {
      done()
    })
    .catch(err => {
      throw new Error(err)
    })
  })

  it('model instance remove', done => {
    riddle.remove()
    .then(() => {
      expect(riddle.$isDeleted()).to.be.true
      Riddle.findOne({_id: riddle._id})
    })
    .then(result => {
      expect(result).not.to.exist
      done()
    })
    .catch(err => {
      throw new Error(err)
    })
  })

  it('class method remove', done => {
    Riddle.deleteMany({title: riddleData.title})
    .then(result => {
      expect(result.ok).to.equal(1)
      expect(result.deletedCount).to.equal(1)
      done()
    })
    
  })

  it('class method find one and remove', done => {
    Riddle.deleteOne({ title: riddle.title})
    .then(result => {
      expect(result.ok).to.equal(1)
      expect(result.deletedCount).to.equal(1)
      done()
    })
    
  })

  it('class method find by id and remove', done => {
    Riddle.deleteOne({_id: riddle._id})
    .then(result => {
      expect(result.ok).to.equal(1)
      expect(result.deletedCount).to.equal(1)
      done()
    })
    
  })




})