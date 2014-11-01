var Transform = require( 'stream' ).Transform;

var MyactStreamTransform = module.exports = function( keyProperty ) {
    Transform.call( this, { objectMode: true });

    this.keyProperty = keyProperty;
};

MyactStreamTransform.prototype = Object.create( Transform.prototype );

MyactStreamTransform.prototype._transform = function( chunk, encoding, done ) {
    this.push({
        key: chunk[ this.keyProperty ],
        data: chunk
    });

    done();
};