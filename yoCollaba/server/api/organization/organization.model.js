'use strict';

import mongoose from 'mongoose';

var OrganizationSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  password: String,
  role: {type:String, default: 'organization'},
  active: {type: Boolean, default: false} 
});

export default mongoose.model('Organization', OrganizationSchema);
