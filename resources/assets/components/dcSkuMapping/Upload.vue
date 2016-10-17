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
          <div class="clearfix"></div>
        </blockquote>

        <!-- The file upload form used as target for the file upload widget -->
        <upload-component
          :upload_url="upload_url"
          :show_upload_notes="show_upload_notes"
          :example_file_url="example_file_url">
        </upload-component>

      </div>
    </div>
  </div>
</template>

<script>
  import UploadComponent from '../common/UploadComponent.vue';
  import { API_URL } from '../../vuex/actions';
  export default {
    components: {
      UploadComponent
    },
    data() {
      return {
        upload_url: API_URL+'mattel-sku-mapping-upload',
        show_upload_notes:true,
        example_file_url: '/donwload-example-file/UploadExample.csv'
      }
    },
  }
</script>