// Create a modal where we'll be showing videos

document.body.insertAdjacentHTML('beforeend', `<div class="modal fade video-modal" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div class="modal-content bg-transparent border-0">
            <div class="ratio ratio-16x9"><iframe class="rounded" allowfullscreen allow="autoplay"></iframe></div>
        </div>
    </div>
</div>`);

let modalElement = document.querySelector('.video-modal');
let modal = new bootstrap.Modal(modalElement);
let modalIframe = modalElement.querySelector('iframe');
let iframeParent = modalIframe.parentNode;
    
modalElement.addEventListener('hidden.bs.modal', e => {
  // When the modal is hidden remove the video to stop playing
  modalIframe.remove(); // remove first to avoid history entries
  modalIframe.src = 'about:blank';
});

// Find all video thumbnails on the page

let videoThumbnails = document.querySelectorAll('.video-thumb');

videoThumbnails.forEach( thumb => {

    let link = thumb.querySelector('a');
    
    if (!link) {
        return;
    }
    
    let match = link.href.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    
    if (!match || !match[1]) {
        // Invalid or unsupported youtube url. Ignore.
        return;
    }
    
    let videoID = match[1];
    
    link.addEventListener('click', e => {
        e.preventDefault();    
        // Remove the iframe before changing the src to avoid history entries
        modalIframe.remove();
        
        let url = 'https://www.youtube.com/embed/' + videoID;
        
        if (thumb.classList.contains('autoplay')) {
            url += '?autoplay=1';
        }
        
        modalIframe.src = url;
        iframeParent.append(modalIframe);
        modal.show();
    });  
});