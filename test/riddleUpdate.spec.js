const expect = require('chai').expect

const Riddle = require('../src/riddle')

describe('Riddle update', () => {

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

  it('instance set and save', done => {
    riddle.set('title', 'Updated Title')
    riddle.save()
    .then(updatedRiddle => {
      expect(updatedRiddle.title).to.equal('Updated Title')
      done()
    })
  })

  it('instance update', done => {
    riddle.updateOne({title: 'Updated Title'})
    .then(result => {
      expect(result).to.deep.equal({ n: 1, nModified: 1, ok: 1 })
      done()
    })
  })

  it('class updateOne', done => {
    Riddle.updateOne({title: 'Updated Title'})
    .then(result => {
      expect(result).to.deep.equal({ n: 1, nModified: 1, ok: 1 })
      done()
    })
  })

  it('class findOneAndUpdate', done => {
    Riddle.findOneAndUpdate({question: 'A yada yada riddle?'}, { title: 'Updated Title' })
    .then(documentBeforeUpdate => {
      Riddle.findById({ _id: documentBeforeUpdate._id})
      .then(documentAfterUpdate => {
        expect(documentAfterUpdate.title).to.equal('Updated Title')
        done()
      })
    })
  })

  it('class findByIdAndUpdate', done => {
    Riddle.findByIdAndUpdate(riddle._id, { title: 'Updated Title' })
    .then(documentBeforeUpdate => {
      Riddle.findById({ _id: documentBeforeUpdate._id})
      .then(documentAfterUpdate => {
        expect(documentAfterUpdate.title).to.equal('Updated Title')
        done()
      })
    })
  })
})