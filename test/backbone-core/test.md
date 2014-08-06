Changes required to backbone-core test suite.

Add backbone.js to the vendor folder

Alter index.html to have the following lines
<script src="vendor/backbone.js"></script>
<script src="../../backbone-enhanced.js"></script>

Alter test-amd.html to have the following lines
'backbone': 'vendor/backbone',
'backbone-enhanced': '../../backbone-enhanced'