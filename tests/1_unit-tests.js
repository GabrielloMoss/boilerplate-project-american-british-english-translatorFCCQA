const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  const translator = new Translator();

  suite('American to British', () => {
    test('Translate Mangoes are my favorite fruit. to British English', () => {
      const result = translator.translate('Mangoes are my favorite fruit.', 'american-to-british');
      assert.include(result, 'favourite');
    });

    test('Translate I ate yogurt for breakfast. to British English', () => {
      const result = translator.translate('I ate yogurt for breakfast.', 'american-to-british');
      assert.include(result, 'yoghurt');
    });

    test("Translate We had a party at my friend's condo. to British English", () => {
      const result = translator.translate("We had a party at my friend's condo.", 'american-to-british');
      assert.include(result, 'flat');
    });

    test('Translate Can you toss this in the trashcan for me? to British English', () => {
      const result = translator.translate('Can you toss this in the trashcan for me?', 'american-to-british');
      assert.include(result, 'bin');
    });

    test('Translate The parking lot was full. to British English', () => {
      const result = translator.translate('The parking lot was full.', 'american-to-british');
      assert.include(result, 'car park');
    });

    test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
      const result = translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british');
      assert.include(result, 'Heath Robinson device');
    });

    test('Translate To play hooky means to skip class or work. to British English', () => {
      const result = translator.translate('To play hooky means to skip class or work.', 'american-to-british');
      assert.include(result, 'bunk off');
    });

    test('Translate No Mr. Bond, I expect you to die. to British English', () => {
      const result = translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british');
      assert.include(result, 'Mr');
      assert.notInclude(result, 'Mr.');
    });

    test('Translate Dr. Grosh will see you now. to British English', () => {
      const result = translator.translate('Dr. Grosh will see you now.', 'american-to-british');
      assert.include(result, 'Dr');
      assert.notInclude(result, 'Dr.');
    });

    test('Translate Lunch is at 12:15 today. to British English', () => {
      const result = translator.translate('Lunch is at 12:15 today.', 'american-to-british');
      assert.include(result, '12.15');
    });
  });

  suite('British to American', () => {
    test('Translate We watched the footie match for a while. to American English', () => {
      const result = translator.translate('We watched the footie match for a while.', 'british-to-american');
      assert.include(result, 'soccer');
    });

    test('Translate Paracetamol takes up to an hour to work. to American English', () => {
      const result = translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american');
      assert.include(result, 'Tylenol');
    });

    test('Translate First, caramelise the onions. to American English', () => {
      const result = translator.translate('First, caramelise the onions.', 'british-to-american');
      assert.include(result, 'caramelize');
    });

    test('Translate I spent the bank holiday at the funfair. to American English', () => {
      const result = translator.translate('I spent the bank holiday at the funfair.', 'british-to-american');
      assert.include(result, 'public holiday');
      assert.include(result, 'carnival');
    });

    test('Translate I had a bicky then went to the chippy. to American English', () => {
      const result = translator.translate('I had a bicky then went to the chippy.', 'british-to-american');
      assert.include(result, 'cookie');
      assert.include(result, 'fish-and-chip shop');
    });

    test("Translate I've just got bits and bobs in my bum bag. to American English", () => {
      const result = translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american');
      assert.include(result, 'odds and ends');
      assert.include(result, 'fanny pack');
    });

    test('Translate The car boot sale at Boxted Airfield was called off. to American English', () => {
      const result = translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american');
      assert.include(result, 'swap meet');
    });

    test('Translate Have you met Mrs Kalyani? to American English', () => {
      const result = translator.translate('Have you met Mrs Kalyani?', 'british-to-american');
      assert.include(result, 'Mrs.');
    });

    test("Translate Prof Joyner of King's College, London. to American English", () => {
      const result = translator.translate("Prof Joyner of King's College, London.", 'british-to-american');
      assert.include(result, 'Prof.');
    });

    test('Translate Tea time is usually around 4 or 4.30. to American English', () => {
      const result = translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american');
      assert.include(result, '4:30');
    });
  });

  suite('Highlight translation', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', () => {
      const result = translator.translate('Mangoes are my favorite fruit.', 'american-to-british');
      assert.include(result, '<span class="highlight">favourite</span>');
    });

    test('Highlight translation in I ate yogurt for breakfast.', () => {
      const result = translator.translate('I ate yogurt for breakfast.', 'american-to-british');
      assert.include(result, '<span class="highlight">yoghurt</span>');
    });

    test('Highlight translation in We watched the footie match for a while.', () => {
      const result = translator.translate('We watched the footie match for a while.', 'british-to-american');
      assert.include(result, '<span class="highlight">soccer</span>');
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
      const result = translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american');
      assert.include(result, '<span class="highlight">Tylenol</span>');
    });
  });
});
