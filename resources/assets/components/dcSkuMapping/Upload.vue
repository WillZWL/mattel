<style>
.dropzone {
  min-height: 100px;
  border: 2px solid #e5e5e5;
  cursor: pointer;
}
.fileinput-button {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.fileinput-button input {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: 'alpha(opacity=0)';
  font-size: 200px !important;
  direction: ltr;
  cursor: pointer;
}
.fileupload-buttonbar .btn,
.fileupload-buttonbar .toggle {
  margin-bottom: 5px;
}
.progress-animated .progress-bar,
.progress-animated .bar {
  background: url("../img/progressbar.gif") !important;
  filter: none;
}
.fileupload-process {
  float: right;
  display: none;
}
.fileupload-processing .fileupload-process,
.files .processing .preview {
  display: block;
  width: 32px;
  height: 32px;
  background: url("../images/loading.gif") center no-repeat;
  background-size: contain;
}
.files audio,
.files video {
  max-width: 300px;
}

@media (max-width: 767px) {
  .fileupload-buttonbar .toggle,
  .files .toggle,
  .files .btn span {
  display: none;
  }
  .files .name {
  width: 80px;
  word-wrap: break-word;
  }
  .files audio,
  .files video {
  max-width: 80px;
  }
  .files img,
  .files canvas {
  max-width: 100%;
  }
}
.dropzone .dz-message {
  text-align: center;
  margin: 2em 0;
  font-size: 2em;
}
.x_content blockquote p {
  padding: 0;
  margin: 0 1em;
}
.x_content blockquote p i{
  margin: 0 1em;
}
.x_content blockquote p a {
  display: block;
  line-height: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
}
.x_content blockquote p a:hover fa {
  font-size: 28px;
  vertical-align: -6px;
}
.x_content blockquote p a:hover {
  background-color: #ddd;
  color: #fff;
  /*padding-left:20px;*/
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

/* Fixes for IE < 8 */
@media screen\9 {
  .fileinput-button input {
  filter: alpha(opacity=0);
  font-size: 100%;
  height: 100%;
  }
}
</style>
<template>
  <div class="col-md-12 col-sm-12 col-xs-12">
    <div class="x_panel">
      <div class="x_title">
        <h2>Upload DC Sku Mapping</h2>
        <ul class="nav navbar-right panel_toolbox">
          <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a></li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <div class="x_content">
        <blockquote>
          <p>Spreadsheet templates are a quick way to upload DC SKU Mapping to ESG in bulk. Edit the spreadsheet as needed. Don't change the columns.</p>
          <p class="col-md-3 col-xs-12"><a href="{{api_url}}mattel-sku-mapping-upload/donwload-example-file/UploadExample.csv?access_token={{access_token}}">Download Example File <strong><i class="fa fa-download"></i></strong></a></p>
          <div class="clearfix"></div>
        </blockquote>
        <!-- The file upload form used as target for the file upload widget -->
        <form id="fileupload" action="{{api_url}}mattel-sku-mapping-upload" method="POST" enctype="multipart/form-data">
          <input type="hidden" name="access_token" value="">
          <!-- The fileupload-buttonbar contains buttons to add/delete files and start/cancel the upload -->
          <div class="row fileupload-buttonbar">
            <div class="col-lg-7">
              <!-- The fileinput-button span is used to style the file input field as button -->
              <span class="btn btn-success fileinput-button">
                <i class="glyphicon glyphicon-plus"></i>
                <span>Add files...</span>
                <input type="file" name="files[]" multiple>
              </span>
              <!-- The global file processing state -->
              <span class="fileupload-process"></span>
            </div>
            <!-- The global progress state -->
            <div class="col-lg-5 fileupload-progress fade">
              <!-- The global progress bar -->
              <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-success" style="width:0%;"></div>
              </div>
              <!-- The extended global progress state -->
              <div class="progress-extended">&nbsp;</div>
            </div>
          </div>
          <!-- The table listing the files available for upload/download -->
          <table role="presentation" class="table table-striped">
            <tbody class="files"></tbody>
          </table>
        </form>
        <div class="dropzone">
          <div class="dz-default dz-message"><span>Drop files here to upload</span></div>
        </div>
        <br>
        <br>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Upload Notes</h3>
      </div>
      <div class="panel-body">
        <ul>
          <li>The maximum file size for uploads in this tool is 1024 KB&nbsp;&nbsp;<strong>  ( 1M )</strong>.</li>
          <li>Only (<strong>CSV , Excel</strong>) are allowed in this tool.</li>
          <li>You can <strong>drag &amp; drop</strong> files from your desktop on this webpage.</li>
          <li>You need download the example file when you use the tool the first time.</li>
          <li>You need any problem when you upload, please ask IT for support.</li>
        </ul>
      </div>
    </div>
  </div>
<!-- The template to display files available for upload -->
<script id="template-upload" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
  <tr class="template-upload fade">
    <td>
      <span class="preview"></span>
    </td>
    <td>
      <p class="name">{%=file.name%}</p>
      <strong class="error text-danger"></strong>
    </td>
    <td>
      <p class="size">Processing...</p>
      <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="progress-bar progress-bar-success" style="width:0%;"></div></div>
    </td>
    <td>
      {% if (!i && !o.options.autoUpload) { %}
        <button class="btn btn-primary start" disabled>
          <i class="glyphicon glyphicon-upload"></i>
          <span>Start</span>
        </button>
      {% } %}
      {% if (!i) { %}
        <button class="btn btn-warning cancel">
          <i class="glyphicon glyphicon-ban-circle"></i>
          <span>Cancel</span>
        </button>
      {% } %}
    </td>
  </tr>
{% } %}
</script>
<!-- The template to display files available for download -->
<script id="template-download" type="text/x-tmpl">
{% for (var i=0, file; file=o.files[i]; i++) { %}
  <tr class="template-download fade">
    <td>
      <span class="preview">
        {% if (file.thumbnailUrl) { %}
          <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" data-gallery><img src="{%=file.thumbnailUrl%}"></a>
        {% } %}
      </span>
    </td>
    <td>
      <p class="name">
        {% if (file.url) { %}
          <a href="{%=file.url%}" title="{%=file.name%}" download="{%=file.name%}" {%=file.thumbnailUrl?'data-gallery':''%}>{%=file.name%}</a>
        {% } else { %}
          <span>{%=file.name%}</span>
        {% } %}
      </p>
      {% if (file.error) { %}
        <div><span class="label label-danger">Error</span> {%=file.error%}</div>
      {% } %}
    </td>
    <td>
      <span class="size">{%=o.formatFileSize(file.size)%}</span>
    </td>
    <td>
      {% if (file.deleteUrl) { %}
        <div class="btn btn-success">
          <span>Success</span>
        </div>
      {% } else { %}
        <button class="btn btn-warning cancel">
          <i class="glyphicon glyphicon-ban-circle"></i>
          <span>Cancel</span>
        </button>
      {% } %}
    </td>
  </tr>
{% } %}
</script>
</template>

<script>
  import { API_URL } from '../../vuex/actions';
  export default {
    ready() {
      this.initUpload()
    },
    data() {
      return {
        api_url: API_URL,
        access_token: localStorage.access_token,
        files: {}
      }
    },
    methods: {
      initUpload() {
        var access_token = this.access_token;
        $("input[name='access_token']").val(access_token);
        $('#fileupload').fileupload({
          url: this.api_url+'mattel-sku-mapping-upload?access_token='+access_token
        });
        // Load existing files:
        $('#fileupload').addClass('fileupload-processing');
        $.ajax({
          url: $('#fileupload').fileupload('option', 'url'),
          dataType: 'json',
          crossDomain:true,
          context: $('#fileupload')[0]
        }).always(function () {
          $(this).removeClass('fileupload-processing');
        }).done(function (result) {
          $(this).fileupload('option', 'done').call(this, $.Event('done'), {result: result});
        });
      }
    }
  }
</script>