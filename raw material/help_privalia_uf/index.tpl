{* ayuda, v1 * mar-10 *}

{* CONFIGURABLE *}
	{assign var=tplsection value="../common/help"}
	{assign var=content value="index"}
	{assign var=menu_header value="help"}
	{assign var=csspagina value="pag-who"}

	{assign var=h1 value=#common_help_title#}
    {assign var=h2 value="Título 2 de ayuda"}
    {assign var=intro value="Párrafo1 de ayuda"}
    {assign var=intro2 value="Párrafo2 de ayuda"}

 	{assign var=sys_logged value="true"}

{* EJECUTA - esta parte no se necesita tocar *}

{include
    file="../backbone.tpl"
    content="$content"
    csspagina="$csspagina"
    
    addJS="$addJS"
}
