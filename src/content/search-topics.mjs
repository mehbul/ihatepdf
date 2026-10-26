// Task phrases shared by public discovery copy and the read-only MCP search.
// Tool IDs remain in the main registry; these labels add common task vocabulary.
export const additionalSearchTopics=[
 {id:'allpng',label:'PDF to PNG',aliases:['PDF pages to PNG images'],note:'A ZIP containing rendered page images; original embedded images are not extracted.'},
 {id:'text',label:'PDF to TXT',aliases:['PDF to text','extract text from PDF'],note:'Extracts selectable text. Scanned images need OCR first.'},
 {id:'markdown',label:'PDF to Markdown',aliases:['PDF to MD'],note:'Page-structured selectable text; original layout is not reconstructed.'},
 {id:'tojson',label:'PDF to JSON',aliases:['extract PDF text as JSON'],note:'Page-by-page selectable text, not a general document-layout API.'},
 {id:'htmltopdf',label:'HTML to PDF',aliases:['local HTML file to PDF'],note:'Supported local HTML/CSS only. Scripts and remote resources are blocked; no webpage URL fetching.'},
 {id:'opendoc',label:'EPUB, ODT and RTF to PDF',aliases:['ebook to PDF','ODS to PDF','ODP to PDF'],note:'Experimental text-only conversion; layout and ebook reading order may change.'},
 {id:'searchableocr',label:'Scanned PDF to searchable PDF',aliases:['English PDF OCR'],note:'English OCR with an invisible text layer. Check recognition and alignment; a model download may be needed.'},
 {id:'ocr',label:'Scanned PDF to text',aliases:['OCR PDF to TXT'],note:'English recognition to TXT. Review names, numbers and symbols.'},
 {id:'splitcustom',label:'Split PDF every N pages',aliases:['split PDF into multiple files'],note:'Produces PDF chunks in a ZIP download.'},
 {id:'crop',label:'Crop PDF margins',aliases:['trim PDF whitespace'],note:'Changes the visible page box; cropped content may remain in the file. Not redaction.'},
 {id:'resize',label:'Resize PDF to A4 or Letter',aliases:['change PDF paper size'],note:'Fits pages to the chosen paper size; inspect readability and placement.'},
 {id:'grayscale',label:'Convert PDF to grayscale',aliases:['black and white PDF'],note:'Rasterizes pages and removes selectable text, forms and accessibility information.'},
 {id:'fillform',label:'Fill PDF forms',aliases:['fill PDF text fields','check PDF checkboxes'],note:'Requires existing named form fields; it does not detect fields automatically.'},
 {id:'createform',label:'Create fillable PDF forms',aliases:['add PDF checkbox','add PDF dropdown'],note:'Adds named fields. Automatic form detection is unavailable.'},
 {id:'flatten',label:'Flatten PDF form fields',aliases:['flatten filled PDF'],note:'Makes supported filled values part of page appearance; inspect the result.'},
 {id:'header',label:'Add PDF header and footer',aliases:['label PDF pages'],note:'Adds new labels without editing original page text.'},
 {id:'bates',label:'Add Bates numbering to PDF',aliases:['Bates stamp PDF'],note:'Adds prefixed, zero-padded page identifiers.'},
 {id:'qrstamp',label:'Add QR code to PDF',aliases:['QR code stamp PDF'],note:'Places the supplied URL or reference code on each page.'},
 {id:'metadata',label:'Edit PDF metadata',aliases:['change PDF title','change PDF author'],note:'Changes standard information fields; does not sanitize hidden data.'},
 {id:'clean',label:'Clear PDF information fields',aliases:['clear PDF title and author'],note:'Clears standard information fields only; hidden data is not removed.'},
 {id:'compare',label:'Compare PDF text',aliases:['find changed PDF pages'],note:'Compares extracted page text, not every visual or structural difference.'},
 {id:'visualcompare',label:'Compare PDFs side by side',aliases:['visual PDF comparison'],note:'Shows corresponding pages locally; does not automatically identify every difference.'},
 {id:'recover',label:'Recover a damaged PDF',aliases:['repair PDF cross references'],note:'Attempts readable object and cross-reference recovery; some files cannot be recovered.'},
 {id:'askpdf',label:'Find answers in PDF passages',aliases:['ask PDF locally','search PDF passages'],note:'Keyword passage retrieval, not AI reasoning or a generated answer.'}
];

export function searchTermsForTool(id){
 const topic=additionalSearchTopics.find(t=>t.id===id);
 return topic?[topic.label,...topic.aliases].join(' '):'';
}
