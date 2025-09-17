-- Create the system config function in m8_schema
CREATE OR REPLACE FUNCTION m8_schema.get_system_config()
RETURNS TABLE(
  customer_filter_displayed boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- For now, return a default configuration that enables the customer filter
  -- This can be modified later to read from an actual system_config table
  RETURN QUERY
  SELECT true as customer_filter_displayed;
END;
$function$;