<template>
    <div class="editor">
        <b-input type="text" v-model="title" placeholder="Saisissez le titre de la newsletter" style="margin-top:10px;"/>

        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">

                <button
                        class="fas fa-bold"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold"
                >
                </button>

                <button
                        class="fas fa-italic"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic"
                >
                </button>

                <button
                        class="fas fa-code"
                        :class="{ 'is-active': isActive.code() }"
                        @click="commands.code"
                >
                </button>

                <button
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                >
                    H1
                </button>

                <button
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                >
                    H2
                </button>

                <button
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                >
                    H3
                </button>

                <button
                        class="fas fa-list"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                >
                </button>

                <button
                        class="fas fa-quote-left"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                >
                </button>
                <span style="margin-left:100px"></span>


                <b-button v-on:click="sendNS()" class="btn-info" style="width:250px;">Envoyer la newsletter <span class="fas fa-paper-plane" style="margin-left:10px;"></span></b-button>

            </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script>
    import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        HorizontalRule,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'
    export default {
        components: {
            EditorContent,
            EditorMenuBar,
        },

        methods: {
            sendNS(){
                let obj = {
                    title: this.title,
                    content: this.editor.getHTML()
                };

                this.$awn.info("Envoi en cours...");

                this.axios.post(localStorage.authUrl+"newsletters", obj, {headers: {"Authorization": localStorage.token}})
                .then(() => {
                    this.$awn.success("Newsletter envoyée !");
                    this.$router.push("/dashboard");
                })
                .catch(() => {
                    this.$awn.alert("Erreur lors de l'envoi !");
                    this.$router.push("/dashboard");
                })

            }
        },

        data() {
            return {

                title: null,

                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new BulletList(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({ levels: [1, 2, 3] }),
                        new HorizontalRule(),
                        new ListItem(),
                        new OrderedList(),
                        new TodoItem(),
                        new TodoList(),
                        new Link(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Strike(),
                        new Underline(),
                        new History(),
                    ],
                    content: `
          Saisissez votre contenu ici.
        `,
                }),
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>