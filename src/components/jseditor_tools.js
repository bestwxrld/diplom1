import Paragraph from '@editorjs/paragraph';
import Table from '@editorjs/table';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';

const customTools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: ['bold', 'italic', 'underline'],
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  header: Header,
  list: List,
  marker: Marker,
  inlineCode: InlineCode
};

export default customTools;