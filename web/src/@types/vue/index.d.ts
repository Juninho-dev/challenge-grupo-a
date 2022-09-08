import Swal from "sweetalert2/dist/sweetalert2.js";

declare module "vue" {
  interface ComponentCustomProperties {
    $swal: typeof Swal & typeof Swal.fire;
  }
}
