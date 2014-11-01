var Transform = require( 'stream' ).Transform;

var MyactStreamTransform = module.exports = function( key ) {
    Transform.call( this, { objectMode: true });

    if ( 'undefined' === typeof key ) key = 'id';
    this.keyProperty = key;
};

MyactStreamTransform.prototype = Object.create( Transform.prototype );

MyactStreamTransform.prototype._transform = function( chunk, encoding, done ) {
    this.push({
        key: chunk[ this.keyProperty ],
        data: chunk
    });

    done();
};