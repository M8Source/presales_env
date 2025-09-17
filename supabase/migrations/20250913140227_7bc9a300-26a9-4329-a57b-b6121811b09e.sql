-- Create function to get locations hierarchy with configurable levels
CREATE OR REPLACE FUNCTION public.get_locations_hierarchy(search_term text DEFAULT NULL::text)
RETURNS TABLE(
  location_id text, 
  location_name text, 
  level_1 text, 
  level_2 text, 
  level_3 text, 
  level_4 text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
begin
  return query
  select
    l.location_id::text,
    l.location_name::text,
    l.level_1::text,
    l.level_2::text,
    l.level_3::text,
    l.level_4::text
  from m8_schema.v_locations l
  where search_term is null
     or l.location_id::text ilike '%' || search_term || '%'
     or l.location_name ilike '%' || search_term || '%'
     or (l.level_1 is not null and l.level_1 ilike '%' || search_term || '%')
     or (l.level_2 is not null and l.level_2 ilike '%' || search_term || '%')
     or (l.level_3 is not null and l.level_3 ilike '%' || search_term || '%')
     or (l.level_4 is not null and l.level_4 ilike '%' || search_term || '%')
  order by l.level_1 nulls last, l.level_2 nulls last, l.level_3 nulls last, l.level_4 nulls last, l.location_name;
end;
$function$